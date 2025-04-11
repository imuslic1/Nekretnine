FROM node:20.17.0          

WORKDIR /wt24p19304       


COPY . /package*.json ./    

RUN npm install             

COPY . .                    

EXPOSE 3000                 
CMD ["node", "index.js"]   
