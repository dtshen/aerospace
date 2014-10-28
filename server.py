from bottle import get, post, request, response, route, run, error, static_file
import json
import urllib2

###########
# HELPERS #
###########
def getQueryUrl(json):
	url = "https://www.space-track.org/"
	
	#basicspacedata, expandedspacedata, fileshare
	url += json["controller"] + "/"

	#query, modeldef
	url += json["action"] + "/"

	url += "class/" + json["class"] + "/"
	url += "format/json/"

	if "predicates" in json:
		for key,value in json["predicates"].items():
			if value: 
				url += key + "/" + value + "/"
	if "metadata" in json:
		url += "metadata/" + json["metadata"] + "/"	
	if "limit" in json:
		url += "limit/" + json["limit"] + "/"
	if "distinct" in json:
		url += "distinct/" + json["distinct"] + "/"
	if "emptyresult" in json:
		url += "emptyresult/" + json["emptyresult"] + "/"

	print "URL: " + url #debug
	return url

############
#  SERVER  #
############

@route('/')
@route('/index.html')
def index():
    return static_file("index.html", root="./")

@route('/<filepath:path>')
@route('/<filepath:path>', method='POST')
def server_static(filepath):
    return static_file(filepath, root="./")

@error(404)
def error404(error):
    return 'oh! ERROR 404'

@route('/json', method='POST')
def getJsonRequest():
	credential = 'identity=zhouxiaohui@g.ucla.edu&password=qazwsxedcrfvtgb&query='
	login_url = 'https://www.space-track.org/ajaxauth/login'

	print "REQUEST :" + request.body.read()
	json_request = json.loads(request.body.read())

	if "controller" not in json_request:
		return {"error":"invalid: no controller"}
	if "action" not in json_request:
		return {"error":"invalid: no action"}
	if "class" not in json_request:
		return {"error":"invalid: no class"}

	query_url = getQueryUrl(json_request)

	#return {"url" : query_url}
	
	req = urllib2.Request(login_url)
	response = urllib2.urlopen(req, credential + query_url)
	
	json_response = json.loads(response.read())
	print "RESULT: " + response.read()
	return json.dumps(json_response)
	
run(host='localhost', port=8080)



