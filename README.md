# okitty-apig
API gateway for okitty token authentication

### Install

```
git clone https://github.com/oyamist/okitty-apig
npm install
```

### Deploy to AWS Lambda
Open terminal window in your `okitty-apig` folder.
Build deployment zipfile ZIPFILENAME 
(default is `~/Downloads/okitty-apig.zip`)

```
./scripts/build.js ZIPFILENAME
```

Use your AWS Lambda console to *Create function*:

* **Author from scratch**
* **Function name:** `okitty-apig`
* **Choose or create an execution role:** `Create a new role with basic Lambda permissions` (or use existing role)
* **Create function**

In the Designer, click **Add Trigger**:

* **Api Gateway**
* **Create an API** `HTTP API` (or use existing API)
* **Security** `Open`
* **Add**

Configure CLIENT_SECRET for your Github Okitty application:

* **Environment variables:** `CLIENT_SECRET` *your Github application client secret*
* **Concurrency:** `1`

In the Designer, click `okitty-apig`:

* **Function code** Click <kbd>Actions</kbd> and `Upload a .zip file`.
* Upload the deployment zip file you just built (i.e., ZIPFILENAME)

Configure concurrency to something reasonable (not 1000!!!):

* **concurrency** `1`

Test your lambda function:

* Test using **hello world** JSON
* Test using HTTPS url show for Api Gateway details
