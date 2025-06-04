FROM node:23-slim AS build

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /urs/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]