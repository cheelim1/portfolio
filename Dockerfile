#consider to use alpine node docker image
FROM node:latest 
# we specify the image name that we need to our project
# ADD . /usr/src/app
WORKDIR /usr/src/app
# setting the path of the working directory ^
COPY package*.json ./
# copying both package.json & package-lock.json
RUN npm install
# installing all the dependencies
COPY . .
# copying all the rest of the files inside our project
EXPOSE 8000
# exposing the port which our application runs on
CMD ["npm", "start" ]
# here, you can enter the command which we use to run our application 