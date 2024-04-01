FROM oven/bun:alpine
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun i -p 
COPY src ./src
COPY .env.production .
VOLUME [ "/data" ]
EXPOSE 80
ENTRYPOINT [ "bun","src/main.ts" ]