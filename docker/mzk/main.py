import json
import os
import requests
import sys
import tempfile
import urllib

print("Loading Omnizart...")
from omnizart.music.app import MusicTranscription

class Config:
  def __init__(self, api_url: str, api_token: str, input_key: str, output_key: str):
    self.api_url = api_url
    self.api_token = api_token
    self.input_key = input_key
    self.output_key = output_key

class Transcribe:
  def __init__(self, config: Config):
    self.config = config

  def run(self):
    input_path = self.download_media_item(self.config.input_key)
    output_path = self.transcribe(input_path)
    self.create_media_item(self.config.output_key, output_path)
    os.remove(input_path)
    os.remove(output_path)

  # returns path to downloaded file
  def download_media_item(self, key: str) -> str:
    quoted_key = urllib.parse.quote(key, safe="")
    url = f"{self.config.api_url}/v1/media/content?key={quoted_key}"
    headers = {"Authorization": f"token {self.config.api_token}"}
    fd, path = tempfile.mkstemp()
    with os.fdopen(fd, "wb") as file:
      with requests.get(url, stream=True, headers=headers) as resp:
        resp.raise_for_status()
        for chunk in resp.iter_content():
          file.write(chunk)
    return path

  # returns path to transcription output PDF
  def transcribe(input_path: str) -> str:
    fd, output_path = tempfile.mkstemp()
    os.fdopen(fd).close()
    MusicTranscription().transcribe(input_path, output=output_path)
    return output_path

  def create_media_item(self, key: str, path: str):
    url = f"{self.config.api_url}/graphql"
    headers = {"Authorization": f"token {self.config.api_token}"}
    with open(path, "rb") as file:
      data = file.read()
      requests.post(url, data=data, headers=headers)

def main(args: List[str]):
  config = Config(*args)
  transcribe = Transcribe(config)
  transcribe.run()

if __name__ == "__main__":
  main(sys.argv[1:])
