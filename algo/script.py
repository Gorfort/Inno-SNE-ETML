from json import load
from requests import get, put
from time import sleep

class Comment:
    def __init__(self):
        self.number_comment = 0
        self.comments = []
        self.new_comments = []
        self.number_new_comment = 0

    def check_new_comment(self):
        with open("data.json", "r", encoding='utf-8') as file:
            secret_word = load(file)

        for p in self.new_comments:
            current_content = p['comment']
            for key in secret_word:
                if key in p:
                    p['comment'] = p['comment'].replace(key, secret_word[key])

            if current_content != p['comment']:
                self.put_comment(p['idComment'], p)

    def check_comment(self):
        if self.number_comment < len(self.comments):
            self.number_new_comment = len(self.comments) - self.number_comment
            self.new_comments = self.comments[-self.number_new_comment:]
            print("Nous avons trouvé " + str(self.number_new_comment) + " nouveau commentaire")
            self.check_new_comment()
            self.number_comment = len(self.comments)
        else:
            print("Aucun nouveau commentaire à été trouvé !!!")


    def get_comments(self):
        req = get('http://localhost:443/comment', headers=custom_headers)
        print("Les commentaires ont bien été récupéré")
        return req.json()['result']
    
    def put_comment(self, id, data):
        put(url='http://localhost:443/comment/' + str(id), data=data, headers=custom_headers)
        print("Le commentaire a bien été modifié")


class Post:
    def __init__(self):
        self.number_post = 0
        self.posts = []
        self.new_posts = []
        self.number_new_post = 0

    def check_new_post(self):
        with open("data.json", "r", encoding='utf-8') as file:
            secret_word = load(file)

        for p in self.new_posts:
            current_content = p['content']
            for key in secret_word:
                if key in p:
                    p['content'] = p['content'].replace(key, secret_word[key])

            if current_content != p['content']:
                self.put_post(p['idPost'], p)

    def check_post(self):
        if self.number_post < len(self.posts):
            self.number_new_post = len(self.posts) - self.number_post
            self.new_posts = self.posts[-self.number_new_post:]
            print("Nous avons trouvé " + str(self.number_new_post) + " nouveau poste")
            self.check_new_post()
            self.number_post = len(self.posts)
        else:
            print("Aucun nouveau post à été trouvé !!!")


    def get_posts(self):
        req = get('http://localhost:443/post', headers=custom_headers)
        print("Les posts ont bien été récupéré")
        return req.json()['data']
    
    def put_post(self, id, data):
        put(url='http://localhost:443/comment/' + str(id), data=data, headers=custom_headers)
        print("Le post a bien été modifié")

post = Post()
comment = Comment()

custom_headers = {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJJc0FkbWluIjoxLCJpYXQiOjE3MTc2NzQ3MzcsImV4cCI6MTc0OTIzMjMzN30.MYdY2xl0l88n8zU5wqdK0B8f6uKK8mx1eLk55E9hPdA'}

while True:
    post.posts = post.get_posts()
    comment.comments = comment.get_comments()

    post.check_post()
    comment.check_comment()

    sleep(2)
    print("\n")