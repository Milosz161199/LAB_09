#!/usr/bin/python3

import json
from sense_emu import SenseHat
from time import sleep

sense = SenseHat()

# data dictionary
dict_data_led = {'x':'', 'y':'', 'r':'', 'g':'','b':''}
dic_data = {'number': '', 'R': 0, 'G': 0, 'B': 0}


file = open('led_display_test_file.json', "r")
if file.readable():
    tmp = file.read()
    js = json.loads(tmp)
    print(js)
file.close()

for i in js:
    dict_data_led['x'] = int(i['number'])%8
    dict_data_led['y'] = int(int(i['number'])/8)
    dict_data_led['r'] = i['R']
    dict_data_led['g'] = i['G']
    dict_data_led['b'] = i['B']
    sense.set_pixel(dict_data_led['x'], dict_data_led['y'], dict_data_led['r'], dict_data_led['g'], dict_data_led['b'])
    #print(dict_data_led)