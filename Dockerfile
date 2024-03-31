FROM oven/bun:alpine
COPY ./dist /app
VOLUME [ "/data" ]
EXPOSE 80
WORKDIR /app
ENTRYPOINT [ "bun","server.js" ]