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
welshcakes_ref = db.collection(u'welshcakes')
welscakes_docs = welshcakes_ref.stream()
shortbread_ref  = db.collection(u'shortbread')
shortbreaddocs = welshcakes_ref.stream()
chocdipped_ref  = db.collection(u'chocDipped')
chocdippeddocs = chocdipped_ref.stream()
scones_ref  = db.collection(u'scones')
sconesdocs = scones_ref.stream()
extras_ref  = db.collection(u'extras')
extrasdocs = extras_ref.stream()

def addField(ref):
    docs = ref.stream()
    for item in docs:
        doc = ref.document(item.id)
        doc.set({u'soldout': False}, merge=True)
        print(item.id)

def addDoc():
    chocdipped_ref.document(u'TEST').set({u'active': False, u'image': u'a/path/', u'productId': u'666', u'title': u'test'})

addField(welshcakes_ref)
addField(shortbread_ref)
addField(scones_ref)
addField(extras_ref)
addField(chocdipped_ref)
#addDoc()


# for item in docs:
#     doc = welshcakes_ref.document(item.id)
#     doc.update({u'soldout': False})

