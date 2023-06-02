import shutil
import os

for folder in os.listdir('./'):
    if (not '.' in folder):
        shutil.copyfile(os.path.join('./', folder, 'book.kdf'), './' + folder + '.kfx')
        os.system('calibre-debug -r "KFX Input" -- -e ' + './' + folder + '.kfx' + ' ' + './' + folder + '.epub')