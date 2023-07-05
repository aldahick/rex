FROM mctlab/omnizart:latest

LABEL org.opencontainers.image.base.name docker.io/aldahick/mzk-runner

COPY main.py /app/main.py

ENTRYPOINT [ "/usr/bin/python3", "/app/main.py" ]
