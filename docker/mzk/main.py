from argparse import ArgumentParser
import os
import requests
import tempfile
from typing import Optional
from urllib.parse import urlparse, parse_qs

def download_audio(url: str) -> str:
  query_params = parse_qs(urlparse(url).query)
  suffix = query_params["key"][0].split(".")[-1]
  fd, path = tempfile.mkstemp(suffix=f".{suffix}")
  os.close(fd)
  print(f"Downloading audio from {url} to {path}")
  # oddly, much faster than equivalent requests.get code.
  # user error, wsl issue, or something else?
  if os.system(f"curl '{url}' > {path}") != 0:
    raise Exception(f"Failed to download {url}")
  size_mb = os.path.getsize(path)/pow(1024,2)
  print(f"Downloaded {url}, size {size_mb} MB")
  return path

def transcribe_audio(input_path: str) -> str:
  print("Loading Omnizart...")
  from omnizart.music.app import MusicTranscription
  fd, output_path = tempfile.mkstemp()
  os.close(fd)
  MusicTranscription().transcribe(input_path, output=output_path)
  return output_path

def run(audio_url: str, output_url: Optional[str], output_path: Optional[str]):
  audio_path = download_audio(audio_url)
  pdf_path = transcribe_audio(audio_path)
  os.remove(audio_path)
  if output_url:
    with open(pdf_path, "rb") as pdf_file:
      pdf_data = pdf_file.read()
      requests.post(output_url, data=pdf_data)
    os.remove(pdf_path)
  elif output_path:
    os.rename(pdf_path, output_path)
  else:
    raise Exception("Must provide either --output-url or --output-path")

def main():
  arg_parser = ArgumentParser()
  arg_parser.add_argument("--audio-url", required=True)
  arg_parser.add_argument("--output-url")
  arg_parser.add_argument("--output-path")
  args = arg_parser.parse_args()
  print(args)
  run(audio_url=args.audio_url, output_url=args.output_url, output_path=args.output_path)

if __name__ == "__main__":
  main()
