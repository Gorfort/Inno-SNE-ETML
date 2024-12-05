FROM mysql

COPY ./db/db_esn_social_network.sql /docker-entrypoint-initdb.d/db_esn_social_network.sql

RUN chown -R mysql:mysql /docker-entrypoint-initdb.d/

CMD ["mysqld", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci"]
