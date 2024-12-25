FROM node:18
WORKDIR /backend
COPY package*.json .
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 5001