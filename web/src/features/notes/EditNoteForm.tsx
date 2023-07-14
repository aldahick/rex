import { Button, Checkbox, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

import { INote, useUpdateNoteBodyMutation } from "../../graphql";
import { useStatus } from "../../hooks";

const ERROR_INSECURE =
  "Insecure browser context. Use HTTPS to edit secure notes.";

export const EditNoteForm: React.FC<{
  note: INote;
}> = ({ note }) => {
  const [updateNoteBody] = useUpdateNoteBodyMutation();
  const [body, setBody] = useState(note.body);
  const [key, setKey] = useState("");
  const [isEncrypted, setIsEncrypted] = useState(body !== note.body);
  const [isKeyValid, setIsKeyValid] = useState(false);
  const status = useStatus();

  const encodedKey = async (iv: Uint8Array, usage: KeyUsage) =>
    crypto.subtle.importKey(
      "raw",
      await crypto.subtle.digest("SHA-256", new TextEncoder().encode(key)),
      {
        name: "AES-GCM",
        // iv,
        length: 256,
      },
      false,
      [usage],
    );

  const isCryptoSupported = () =>
    "crypto" in window && "subtle" in crypto && "encrypt" in crypto.subtle;

  const encryptBody = async (): Promise<string | undefined> => {
    if (!isEncrypted) {
      return body;
    }
    if (!isCryptoSupported()) {
      status.error(ERROR_INSECURE);
      return;
    }
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const encrypted = new Uint8Array(
      await crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv,
        },
        await encodedKey(iv, "encrypt"),
        new TextEncoder().encode(body),
      ),
    );
    return JSON.stringify({
      iv: Array.from(iv),
      encrypted: Array.from(encrypted),
    });
  };

  const decryptBody = async (): Promise<string | undefined> => {
    let data: { iv: number[]; encrypted: number[] };
    try {
      data = JSON.parse(note.body) as { iv: number[]; encrypted: number[] };
    } catch (err) {
      // if not valid JSON,
      return undefined; // it's not encrypted at all
    }
    if (!isCryptoSupported()) {
      status.error(ERROR_INSECURE);
      return "";
    }
    if (!key) {
      return "";
    }
    const iv = new Uint8Array(data.iv);
    const encrypted = new Uint8Array(data.encrypted);
    try {
      return await crypto.subtle
        .decrypt(
          {
            name: "AES-GCM",
            iv,
          },
          await encodedKey(iv, "decrypt"),
          encrypted,
        )
        .then((d) => new TextDecoder().decode(d));
    } catch (err) {
      if (err instanceof DOMException) {
        status.error(err.message);
      }
      return "";
    }
  };

  const attemptDecryptBody = () => {
    decryptBody()
      .then((newBody) => {
        if (newBody !== undefined) {
          setBody(() => {
            setIsEncrypted(true);
            if (newBody === "") {
              return "*** Encrypted ***";
            }
            setIsKeyValid(true);
            return newBody;
          });
        }
      })
      .catch(status.error);
  };

  const submit = async () => {
    try {
      const encryptedBody = await encryptBody();
      if (encryptedBody === undefined) {
        return;
      }
      await updateNoteBody({
        variables: {
          id: note.id,
          body: encryptedBody,
        },
      });
      status.success("Updated note body");
    } catch (err) {
      status.error(err);
    }
  };

  if (!isKeyValid) {
    attemptDecryptBody();
  }
  useEffect(attemptDecryptBody, [key]);

  return (
    <Grid container direction="column">
      <Grid item>
        <TextField
          maxRows={0}
          multiline
          label="Body"
          value={body}
          onChange={(evt) => setBody(evt.target.value)}
        />
      </Grid>
      <Grid item>
        <TextField
          type="password"
          label="Key"
          value={key}
          onChange={(evt) => setKey(evt.target.value)}
        />
      </Grid>
      <Grid item>
        <Checkbox
          value={isEncrypted}
          checked={isEncrypted}
          onChange={(evt) => setIsEncrypted(evt.target.checked)}
        />
        <Button onClick={submit}>Submit</Button>
      </Grid>
    </Grid>
  );
};
