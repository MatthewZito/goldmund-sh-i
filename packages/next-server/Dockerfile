FROM node:13.6.0
WORKDIR /usr/src/next-server
COPY ./ ./
RUN npm install
RUN npm run build
CMD ["/bin/bash"]