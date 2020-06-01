FROM node:13.6.0
WORKDIR /usr/src/goldmund-client
COPY ./ ./
RUN chmod +x wait-for-it.sh
RUN npm install
CMD ["/bin/bash"]