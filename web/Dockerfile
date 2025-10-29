# syntax=docker/dockerfile:1
FROM node:20-bullseye

WORKDIR /workspace

# Install dependencies first for better caching
COPY package.json ./
COPY app/package.json app/
COPY web/package.json web/
COPY packages/shared/package.json packages/shared/

RUN npm install

# Copy the rest of the repository
COPY . .

EXPOSE 5173

CMD ["npm", "run", "--workspace", "web", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
