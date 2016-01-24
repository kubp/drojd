define({ "api": [
  {
    "type": "get",
    "url": "/login/",
    "title": "Api Auth",
    "version": "1.0.0",
    "name": "GetLogin",
    "group": "Login",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "description": "<p>Desc</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mail",
            "description": "<p>Mail</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pass",
            "description": "<p>Pass</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Auth Response Authorized",
          "content": "HTTP/1.1 200 OK\n {\n    status: 200,\n    message: \"Authorized\",\n    apikey: \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTZkc2ZzZmRkZGRkZGRkNzg5MCIsIm5hbWUiOiJKb2huIERvZSIsImFkbWluIjp0cnVlfQ.9Bm7UCSB78F-wiphRyFKjaYPx2aBpRjK8fyL_nD93tU\",\n    userid: \"bGciOiJIUzI1NiIsInR5cCI6a\"\n }",
          "type": "json"
        },
        {
          "title": "Auth Response Unauthorized",
          "content": "HTTP/1.1 200 OK\n {\n   status: 401,\n    message: \"Unauthorized\"\n }",
          "type": "json"
        }
      ]
    },
    "filename": "./doc/doc.js",
    "groupTitle": "Login"
  },
  {
    "type": "get",
    "url": "/verify/:token",
    "title": "Verify Token",
    "version": "1.0.0",
    "name": "GetVerify",
    "group": "Login",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "description": "<p>Desc</p>",
    "success": {
      "examples": [
        {
          "title": "Auth Response Verify",
          "content": "HTTP/1.1 200 OK\n {\n    status: 200,\n    message: \"Authorized\"\n }",
          "type": "json"
        },
        {
          "title": "Auth Response Unauthorized",
          "content": "HTTP/1.1 200 OK\n {\n   status: 401,\n    message: \"Unauthorized\"\n }",
          "type": "json"
        }
      ]
    },
    "filename": "./doc/doc.js",
    "groupTitle": "Login"
  },
  {
    "type": "get",
    "url": "/page/{q,limit,page}",
    "title": "Read Page",
    "version": "1.0.0",
    "name": "GetPage",
    "group": "Page",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "description": "<p>Desc</p>",
    "success": {
      "examples": [
        {
          "title": "Page Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"567d56253826a5d70375c237\",\n  \"title\": \"title\",\n  \"description\": \"desc\",\n  \"headline\": \"head\",\n  \"content\": \"content\"\n }",
          "type": "json"
        }
      ]
    },
    "filename": "./doc/doc.js",
    "groupTitle": "Page"
  },
  {
    "type": "post",
    "url": "/page/",
    "title": "Create a page",
    "version": "1.0.0",
    "name": "PostPage",
    "group": "Page",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>In this case &quot;apiUse&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "descritpion",
            "description": "<p>Title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "headline",
            "description": "<p>Title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Title</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"firstname\": \"John\",\n  \"lastname\": \"Doe\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./doc/doc.js",
    "groupTitle": "Page"
  },
  {
    "type": "put",
    "url": "/page/:id",
    "title": "Change Page",
    "version": "1.0.0",
    "name": "PutPage",
    "group": "Page",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>This function has same errors like POST /user, but errors not defined again, they were included with &quot;apiUse&quot;</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "descritpion",
            "description": "<p>Title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "headline",
            "description": "<p>Title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Title</p>"
          }
        ]
      }
    },
    "filename": "./doc/doc.js",
    "groupTitle": "Page"
  },
  {
    "type": "get",
    "url": "/section/{q,limit,page}",
    "title": "Read Section",
    "version": "1.0.0",
    "name": "GetSection",
    "group": "Section",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "description": "<p>Desc</p>",
    "success": {
      "examples": [
        {
          "title": "Page Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"567d56253826a5d70375c237\",\n  \"url\": \"/test/test\",\n  \"type\": \"page\",\n     { optioonal }\n }",
          "type": "json"
        }
      ]
    },
    "filename": "./doc/doc.js",
    "groupTitle": "Section"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./doc/src/main.js",
    "group": "_home_kuba_git_drojd_doc_src_main_js",
    "groupTitle": "_home_kuba_git_drojd_doc_src_main_js",
    "name": ""
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./doc/template/main.js",
    "group": "_home_kuba_git_drojd_doc_template_main_js",
    "groupTitle": "_home_kuba_git_drojd_doc_template_main_js",
    "name": ""
  }
] });