"""
from json import load
from requests import get, delete
from time import sleep

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
            for key in secret_word:
                if secret_word[key] in p:
                    post.delete_post(p['id'])

    def check_post(self):
        if self.number_post < len(self.posts):
            self.number_new_post = len(self.posts) - self.number_post
            self.new_posts = self.posts[-self.number_new_post]
            self.check_new_post()
            print("Nous avons trouvé " + str(self.number_new_post) + " nouveau poste")
            self.number_post = len(self.posts)
        else:
            print("Aucun nouveau post à été trouvé !!!")


    def get_allPost(self):
        req = get('http://localhost:3000/api/products')
        print("Les posts ont bien été récupéré")
        return req.json()['data']

    def delete_post(self, id):
        delete('http://localhost:3000/api/comments/' + id)
        print("Le post à bien été retiré")

post = Post()

while True:
    post.posts = post.get_allPost()
    post.check_post()
    sleep(2)
    print("\n")
"""
from time import sleep

while True:
    print("Hello, World")
    sleep(1)