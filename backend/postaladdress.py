
import csv

with open("US.txt") as tsv:
    for line in csv.reader(tsv, dialect="excel-tab"): #You can also use delimiter="\t" rather than giving a dialect.
       print 'db.postalAddress.insert ( { "country" : "%s", "postalcode": "%s", "city": "%s", "state": "%s", "statecode" : "%s","county":	"%s", "countycode" : "%s", "subdivision" : "%s", "subdivisioncode": "%s", "lattitude" : "%s", "longitude" : "%s", "accuracy": "%s" } )' % (line[0], line[1],line[2], line[3],line[4], line[5],line[6], line[7],line[8], line[9], line[10], line[11])
