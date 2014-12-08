from bottle import get, post, request, response, route, run, error, static_file
import json
import urllib2
import os.path
###########
# HELPERS #
###########
def getQueryUrlAndCacheFileName(json):
	url = "https://www.space-track.org/"
	#basicspacedata, expandedspacedata, fileshare
	url += json["controller"] + "/"

	#query, modeldef
	url += json["action"] + "/"

	url += "class/" + json["class"] + "/"
	cache = "./cache/" + json["class"]
	url += "format/json/"

	if "predicates" in json:
		for key,value in json["predicates"].items():
			if value: 
				url += key + "/" + value + "/"
				cache += "-" + key + "_" + value
	if "metadata" in json:
		url += "metadata/" + json["metadata"] + "/"	
		cache += "-metadata_" + json["metadata"]
	if "limit" in json:
		url += "limit/" + json["limit"] + "/"
		cache += "-limit_" + json["limit"]
	if "distinct" in json:
		url += "distinct/" + json["distinct"] + "/"
		cache += "-distinct_" + json["distinct"]
	if "emptyresult" in json:
		url += "emptyresult/" + json["emptyresult"] + "/"
		cache += "-emptyresult_" + json["emptyresult"]

	cache += ".json"
	print "URL: " + url
	print "CACHE: " + cache 
	return {"url":url,"cache" : cache}


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

	result = getQueryUrlAndCacheFileName(json_request)
	query_url = result["url"]
	cache_file = result["cache"]
	
	if(os.path.exists(cache_file)):
		print "LOAD FROM CACHE"
		return open(cache_file)

	req = urllib2.Request(login_url)
	response = urllib2.urlopen(req, credential + query_url)
	
	json_response = json.loads(response.read())
	print "LOAD FROM SERVER"
	print "RESULT: " + json.dumps(json_response)

	with open(cache_file, "w") as cache:
		json.dump(json_response,cache)
	return json.dumps(json_response)
	
run(host='localhost', port=8080)



