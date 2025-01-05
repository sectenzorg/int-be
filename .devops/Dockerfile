# Stage 1: Build the application
FROM node:23-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
RUN npm install --production
COPY . .

# Stage 2: Create the final image
FROM node:23-alpine
WORKDIR /app
COPY --from=builder /app /app
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
EXPOSE 3006
CMD ["node", "src/app.js"]