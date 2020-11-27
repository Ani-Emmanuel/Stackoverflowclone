FROM node:10-alpine
COPY . /
RUN npm install
EXPOSE 3000
CMD ["node", "start.js"]
