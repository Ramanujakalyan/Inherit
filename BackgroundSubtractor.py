import cv2
import cv2.cv as cv
import numpy as np
 
capture = cv2.VideoCapture("PeopleTracking.avi")
size = (int(capture.get(cv2.cv.CV_CAP_PROP_FRAME_WIDTH)),
        int(capture.get(cv2.cv.CV_CAP_PROP_FRAME_HEIGHT)))
fourcc = cv2.cv.FOURCC(*"DIB ")
video = cv2.VideoWriter('output.avi', fourcc, 30,size)
fgbg = cv2.BackgroundSubtractorMOG()
 
while True:
    ret, img = capture.read()
    if ret==True:
 
        fgmask = fgbg.apply(img)
        video.write(fgmask)
        cv2.imshow('forehead',fgmask)
 
    if(cv2.waitKey(27)!=-1):
        break
 
capture.release()
video.release()
cv2.destroyAllWindows()
print('Done!')
