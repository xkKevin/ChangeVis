from flask import Flask
# from flask_cors import CORS  # 前端已经通过代理处理CORS了，因此后端不需要再开启

# 当设置了某个路径为static_folder后，自动将最后一个文件夹设置为url的静态文件访问起始网址
# 如static_folder='../dist/static/data'，则 http://localhost/data/t.json 访问 ../dist/static/data/t.json文件（此相对路径相对的是app.py的路径）
app = Flask(__name__, static_folder='../data', template_folder='../dist')
# CORS(app, supports_credentials=True)  # 解决跨域问题，其实只有在开发时才有用

port = 8080

@app.route('/')
def hello():
    return 'This is the Backend module.'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port, debug=True)