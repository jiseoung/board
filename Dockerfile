FROM ubuntu:22.04

RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
RUN nvm install node

WORKDIR /board

COPY . .
RUN npm install

EXPOSE 8080

CMD ["node", "app.js"]