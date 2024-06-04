FROM mysql

COPY *.sql /docker-entrypoint-initdb.d/

ENV MYSQL_ROOT_PASSWOD=root
ENV MYSQL_DATABASE=mydatabase

EXPOSE 3306