FROM node:13.6.0
RUN mkdir -p /home/node/app/node_modules && mkdir -p /home/node/app/.next && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .
RUN chmod +x wait-for-it.sh
CMD ["/bin/bash"]

