import http.server
import socketserver
import os

os.chdir(r'C:\Claude Code\design-extract')
PORT = 8000
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Server running at http://localhost:{PORT}/")
    print("Open: http://localhost:8000/PCC PCOD Prototype.html")
    httpd.serve_forever()