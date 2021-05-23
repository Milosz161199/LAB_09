#!/usr/bin/python3

import json
import time
from sense_emu import SenseHat

sense = SenseHat()

# data dictionary
dict_data = {}


try:
    while True:
        orientation_deg = sense.get_orientation_degrees()
        orientation_rad = sense.get_orientation_radians()
        roll = orientation_deg['roll']
        dict_data['roll'] = roll
        pitch = orientation_rad['pitch']
        dict_data['pitch'] = pitch

        p = dict_data
        p_json = json.dumps(p)
        
        #save to file
        try:
            datafile = open("chartdata.json","w")
            datafile.write(p_json)
        except:
            print("Write Error")
        finally:
            datafile.close()
        time.sleep(0.1)
except KeyboardInterrupt:
	pass