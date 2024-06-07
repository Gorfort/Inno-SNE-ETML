from json import load
from requests import get, post, put
from time import sleep

def get_token(username, password):
    return post('http://localhost:443/login', json={ 'username': username, 'password': password }).json()['token']

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
                if key in p.split(' '):
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
                if key in current_content.split(' '):
                    p['content'] = p['content'].replace(key, secret_word[key])

            current_title = p['title']
            for key in secret_word:
                if key in current_title.split(' '):
                    p['title'] = p['title'].replace(key, secret_word[key])

            if current_content != p['content'] or current_title != p['title']:
                self.put_post(p['idPost'], { 'title': p['title'], 'content': p['content'], 'fk_User': p['fk_User'] } )

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

user_post = Post()
comment = Comment()

custom_headers = {'Authorization': 'Bearer ' + get_token('Admin', 'password')}

while True:
    user_post.posts = user_post.get_posts()
    comment.comments = comment.get_comments()

    user_post.check_post()
    comment.check_comment()

    sleep(2)
    print("\n")