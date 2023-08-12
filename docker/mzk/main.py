import json
import os
import requests
import sys
import tempfile
import urllib

class Config:
  def __init__(self, api_url: str, api_token: str, input_key: str, output_uri: str):
    self.api_url = api_url
    self.api_token = api_token
    self.input_key = input_key
    self.output_uri = output_uri

class Transcribe:
  def __init__(self, config: Config):
    self.config = config

  def run(self):
    input_path = self.download_media_item(self.config.input_key)
    output_path = self.transcribe(input_path)
    self.upload(self.config.output_uri, output_path)
    os.remove(input_path)
    os.remove(output_path)

  # returns path to downloaded file
  def download_media_item(self, key: str) -> str:
    quoted_key = urllib.parse.quote(key, safe="")
    url = f"{self.config.api_url}/v1/media/content?key={quoted_key}"
    fd, path = tempfile.mkstemp(suffix="." + key.split(".")[-1])
    headers = f"-H 'Authorization: bearer {self.config.api_token}'"
    print(f"Downloading {key} from {url} to {path}")
    # oddly, much faster than equivalent requests.get code. user error, wsl issue, or something else?
    os.system(f"curl {headers} '{url}' > {path}")
    # headers = {"Authorization": f"bearer {self.config.api_token}"}
    # with os.fdopen(fd, "wb") as file:
    #   with requests.get(url, stream=True, headers=headers) as resp:
    #     if resp.status_code != 200:
    #       raise Exception(f"Failed to fetch recording media: {resp.status_code}, {resp.text}")
    #     for chunk in resp.iter_content():
    #       file.write(chunk)
    print(f"Downloaded {key} size {os.path.getsize(path)/pow(1024,2)} MB")
    return path

  # returns path to transcription output PDF
  def transcribe(self, input_path: str) -> str:
    print("Loading Omnizart...")
    from omnizart.music.app import MusicTranscription
    fd, output_path = tempfile.mkstemp()
    os.fdopen(fd).close()
    MusicTranscription().transcribe(input_path, output=output_path)
    return output_path

  def upload(self, uri: str, path: str):
    if uri.startswith("file://"):
      os.rename(path, uri[7:])
    elif uri.startswith("rex://"):
      self.create_media_item(uri[6:], path)

  def create_media_item(self, key: str, path: str):
    url = f"{self.config.api_url}/graphql"
    headers = {"Authorization": f"token {self.config.api_token}"}
    with open(path, "rb") as file:
      data = file.read()
      requests.post(url, data=data, headers=headers)

# omnizart's deps prevent upgrading to python 3.11 / typed lists :(
def main(args: list):
  config = Config(*args)
  transcribe = Transcribe(config)
  transcribe.run()

if __name__ == "__main__":
  main(sys.argv[1:])
