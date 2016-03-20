define({ "api": [
  {
    "type": "post",
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
    "filename": "./doc.js",
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
    "filename": "./doc.js",
    "groupTitle": "Login"
  },
  {
    "type": "get",
    "url": "/page{/search}?q={query}{&page,per_page}",
    "title": "View Page",
    "version": "1.0.0",
    "name": "GetPage",
    "group": "Page",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Desc</p>",
    "success": {
      "examples": [
        {
          "title": "Page Response",
          "content": "HTTP/1.1 200 OK\n[\n {\n   \"_id\": \"56ee8f670006866e2462a41c\",\n   \"title\": \"Lorem asdsda asdsad\",\n   \"type\": \"page\",\n   \"description\": \"adsd as adsadssad\",\n   \"raw_content\":\"<h1>raw</h1>\",\n   \"md_content\": \"# raw\",\n   \"url\":\"/raw\",\n   \"image\": \"\",\n   \"created_at\": \"2016-03-20T11:54:15.106Z\",\n   \"page_url\": \"http://localhost:8090/api/page/56ee8f670006866e2462a41c\"\n }\n]",
          "type": "json"
        },
        {
          "title": "Page Not Found Response",
          "content": "HTTP/1.1 404 Not Found\n{\n error: \"Requested resource doesn't exist\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./doc.js",
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
        "name": "admin"
      }
    ],
    "description": "<p>Create a page</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>url</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>type</p>"
          },
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
            "description": "<p>Description</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "headline",
            "description": "<p>Headline</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "md_content",
            "description": "<p>Markdown content</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "raw_content",
            "description": "<p>Html content</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "perex",
            "description": "<p>Perex</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>Author</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "tags",
            "description": "<p>Tags</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Image</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "visible",
            "defaultValue": "1",
            "description": "<p>TVisible</p>"
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
    "filename": "./doc.js",
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
        "name": "admin"
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
            "field": "url",
            "description": "<p>url</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>type</p>"
          },
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
            "description": "<p>Description</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "headline",
            "description": "<p>Headline</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "md_content",
            "description": "<p>Markdown content</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "raw_content",
            "description": "<p>Html content</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "perex",
            "description": "<p>Perex</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>Author</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "tags",
            "description": "<p>Tags</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Image</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "visible",
            "defaultValue": "1",
            "description": "<p>TVisible</p>"
          }
        ]
      }
    },
    "filename": "./doc.js",
    "groupTitle": "Page"
  },
  {
    "type": "delete",
    "url": "/page/{id}",
    "title": "Delete Page",
    "version": "1.0.0",
    "name": "RemovePage",
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
          "content": "    HTTP/1.1 200 OK\n{\n status: \"Resource removed successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./doc.js",
    "groupTitle": "Page"
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
    "filename": "./src/main.js",
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
    "filename": "./template/main.js",
    "group": "_home_kuba_git_drojd_doc_template_main_js",
    "groupTitle": "_home_kuba_git_drojd_doc_template_main_js",
    "name": ""
  }
] });
