from json import load, dump
from requests import get, post, put
from time import sleep
import re

def get_token(username : str = "", password : str = ""):
    """Get the token From the API and return it
    
    If the arguments `username` and `password` aren't passed the value empty is used

    Parameters
    ----------
    username : str, optional
        The username of user.
    password : str, optional
        The password of the user 
    
    """
    res = post('http://nodejs:443/login', json={ 'username': username, 'password': password })
    token = res.json()['token']
    return token

def initialize_json():
    """initiliatize the json for the dictionnary"""
    with open('data.json', 'r', encoding='utf-8') as file:
        data = load(file)

    capitalized_data = {key.capitalize(): value.capitalize() for key, value in data.items()}

    extended_data = {**data, **capitalized_data}

    with open('data.json', 'w', encoding='utf-8') as f:
        dump(extended_data, f, ensure_ascii=False, indent=4)

def change_text(txt : str = "") -> str:
    """Change the number of it's equalivent in letter and remove special caracter

    If the argument `txt` isn't passed the default value is used

    Parameters
    ----------
    txt : str
        The text to normalize
    """
    letter = ['o', 'i', '2', 'e', 'a', 's', '7', 'z', '8', '9']

    txt = re.sub(r"[^a-zA-Z\d\s]+", "", txt)

    r = re.findall(r'\d', txt)

    for s in r:
        txt = txt.replace(s, letter[int(s)])

    return txt


class Comment:
    """
    A class used to handle the comment in the application

    Attributes
    ----------
    number_comments : int
        the number of comments that the algorythm has discover
    comments : List
        the list of all the comments
    new_comments : List
        the list of the comments find after the request every 2 sec
    number_new_comments : int
        the number of new comments find after the request every 2 sec

    Methods
    -------
    check_new_comments()
        Check if new comments have benn posted and handle it
    check_comment()
        Main Loop of the Comment class if a new comment was found call the function check_new_comment
    get_comment() -> List
        Do a GET HTTP request on the API and return the result
    put_comment()
        Do a PUT HTTP Request on the api if the function check_new_comment find an irregular word
    """
    def __init__(self):
        self.number_comment = 0
        self.comments = []
        self.new_comments = []
        self.number_new_comment = 0

    def check_new_comment(self):
        """Check if new comments have benn posted and handle it"""
        with open("data.json", "r", encoding='utf-8') as file:
            secret_word = load(file)

        for c in self.new_comments:
            c['comment'] = change_text(c['comment'])
            current_content = c['comment']
            for key in secret_word:
                if key in current_content.split(' '):
                    c['comment'] = c['comment'].replace(key, secret_word[key])

            if current_content != c['comment']:
                self.put_comment(c['idComment'], { 'comment': c['comment'] } )

    def check_comment(self):
        """Main Loop of the Comment class if a new comment was found call the function check_new_comment"""
        if self.number_comment < len(self.comments):
            self.number_new_comment = len(self.comments) - self.number_comment
            self.new_comments = self.comments[-self.number_new_comment:]
            print("Nous avons trouvé " + str(self.number_new_comment) + " nouveau commentaire")
            self.check_new_comment()
            self.number_comment = len(self.comments)
        else:
            print("Aucun nouveau commentaire à été trouvé !!!")


    def get_comments(self):
        """Do a GET HTTP request on the API and return the result
        
        Returns
        -------
        list
            All the data from the API
        """
        req = get('http://nodejs:443/comment', headers=custom_headers)
        print("Les commentaires ont bien été récupéré")
        return req.json()['result']
    
    def put_comment(self, id, data):
        """Do a PUT HTTP Request on the api if the function check_new_comment find an irregular word"""
        put(url='http://nodejs:443/comment/' + str(id), json=data, headers=custom_headers)
        print("Le commentaire a bien été modifié")


class Post:
    """
    A class used to handle the post of the social network

    Attributes
    ----------
    number_post : int
        The number of post discover in the application
    posts : List
        All the post discover in the application
    new_posts : List
        The new post discover with the request GET every 2 sec
    number_new_post : int
        The number of new post discover with thr request GET every 2 sec

    Methods
    -------
    check_new_post()
        Check if any offensive word is in the new post retrieve
    check_post()
        Main loop of the class call the function check_new_post if the algorythm discover new post
    get_post() -> List
        Doing a GET HTTP request to the API and return the result
    put_post()
        Doing a PUT HTTP request to the API to remove the offensive word
    """
    def __init__(self):
        self.number_post = 0
        self.posts = []
        self.new_posts = []
        self.number_new_post = 0

    def check_new_post(self):
        """Check if any offensive word is in the new post retrieve"""
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
                self.put_post(p['idPost'], { 'title': p['title'], 'content': p['content'] } )

    def check_post(self):
        """Main loop of the class call the function check_new_post if the algorythm discover new post"""
        if self.number_post < len(self.posts):
            self.number_new_post = len(self.posts) - self.number_post
            self.new_posts = self.posts[-self.number_new_post:]
            print("Nous avons trouvé " + str(self.number_new_post) + " nouveau poste")
            self.check_new_post()
            self.number_post = len(self.posts)
        else:
            print("Aucun nouveau post à été trouvé !!!")


    def get_posts(self):
        """Doing a GET HTTP request to the API and return the result
        
        Returns
        -------
        list
            All the data from the API
        """
        req = get('http://nodejs:443/post', headers=custom_headers)
        print("Les posts ont bien été récupéré")
        return req.json()['data']
    
    def put_post(self, id, data):
        """Doing a PUT HTTP request to the API to remove the offensive word"""
        put(url='http://nodejs:443/post/' + str(id), json=data, headers=custom_headers)
        print("Le post a bien été modifié")

#user_post = Post()
#comment = Comment()

#custom_headers = {'Authorization': 'Bearer ' + get_token('Admin', 'password')}

#initialize_json()

# Main Loop of the program. This script work 24/24 so a infinite loop is appropriate
#while True:
    #user_post.posts = user_post.get_posts()
    #comment.comments = comment.get_comments()

    #user_post.check_post()
    #comment.check_comment()

    #sleep(2)
    #print("\n")
