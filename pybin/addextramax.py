#!/home/bradrice/miniconda3/envs/py3/bin/python
import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account
cred = credentials.Certificate('/home/bradrice/.cert/firebase/welshbaker2-0b2a26e8ddc6.json')
firebase_admin.initialize_app(cred)
os.environ["FIRESTORE_EMULATOR_HOST"] = "127.0.0.1:8080"
data = {u'soldout': True}
db = firestore.client()
# col = db.collection(u'boxsize').document(u'11-pack').update(data)
extras_ref  = db.collection(u'extras')
extrasdocs = extras_ref.stream()

def addField(ref):
    docs = ref.stream()
    for item in docs:
        doc = ref.document(item.id)
        doc.set({u'maxlimit': 3}, merge=True)
        print(item.id)

def addDoc():
    extrasdocs.document(u'TEST').set({u'active': False, u'image': u'a/path/', u'productId': u'666', u'title': u'test'})

addField(extras_ref)
#addDoc()


# for item in docs:
#     doc = welshcakes_ref.document(item.id)
#     doc.update({u'soldout': False})

