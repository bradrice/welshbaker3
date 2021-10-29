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

notes_data = [
        {u'order': 1, u'note': 'Scones can only be added to boxes of 11 or more packs and boxes that contain Extras.'},
        {u'order': 2, u'note': 'WF = Wheat Free (Oat Flour Recipe)'},
        {u'order': 3, u'note': 'VG = Vegan (Natural Balance Margarine/Oat Milk) recipe'},
        {u'order': 3, u'note': 'Clotted cream not being shipped until August'}
        ]

# notes_ref = db.collection(u'notes').add(notes_data[0]);

for item in notes_data:
    notes_ref = db.collection(u'notes').add(item)



