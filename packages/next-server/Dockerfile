FROM node:13.6.0
ENV PORT 3000
WORKDIR /usr/src/next-server
COPY ./ ./
RUN npm install

# Building app
RUN npm run build
EXPOSE 3000
# Running the app
CMD "npm" "run" "dev"