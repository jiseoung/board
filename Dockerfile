FROM ubuntu:22.04

RUN apt-get update -y && apt-get upgrade -y && \
    apt-get install -y curl bash build-essential

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash && \
    export NVM_DIR="/root/.nvm" && \
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && \
    nvm install node && \
    nvm alias default node && \
    nvm use node && \
    ln -sf $NVM_DIR/versions/node/$(nvm current)/bin/node /usr/local/bin/node && \
    ln -sf $NVM_DIR/versions/node/$(nvm current)/bin/npm /usr/local/bin/npm

ENV NVM_DIR=/root/.nvm
ENV PATH=$NVM_DIR/versions/node/v18.17.1/bin:$PATH

WORKDIR /board

COPY . .
RUN npm install

EXPOSE 8080

CMD ["node", "app.js"]
