from bottle import get, post, request, response, route, run, error, static_file
import json
import urllib2
def getQuery(json):
	url = "https://www.space-track.org/"
	
	url += json["controller"] + "/"
	url += json["action"] + "/"
	url += "class/" + json["class"] + "/"
	url += "format/json/"

	if "predicates" in json:
		url += "predicates/" + json["predicates"] + "/"
	if "metadata" in json:
		url += "metadata/" + json["metadata"] + "/"	
	if "limit" in json:
		url += "limit/" + json["limit"] + "/"
	if "distinct" in json:
		url += "distinct/" + json["distinct"] + "/"
	if "emptyresult" in json:
		url += "emptyresult/" + json["emptyresult"] + "/"

	print "Calculated URL: " + url 
	return url

# "https://www.space-track.org/basicspacedata/query/class/boxscore/format/json/limit/1"

@route('/')
@route('/index.html')
def index():
    return static_file("index.html", root="./")

@route('/<filepath:path>')
def server_static(filepath):
    return static_file(filepath, root="./")

@error(404)
def error404(error):
    return 'oh! ERROR 404'

@route('/json', method='POST')
def getJsonRequest():
	json_request = json.loads(request.body.read())

	if "controller" not in json_request:
		return {"error":"invalid json, no controller"}
	if "action" not in json_request:
		return {"error":"invalid json, no action"}
	if "class" not in json_request:
		return {"error":"invalid json, no class"}

	query = getQuery(json_request)

	req = urllib2.Request('https://www.space-track.org/ajaxauth/login')
	response = urllib2.urlopen(req, 'identity=zhouxiaohui@g.ucla.edu&password=qazwsxedcrfvtgb&query=' + query)
	
	json_response = json.loads(response.read())
	return json.dumps(json_response)

run(host='localhost', port=8080)



