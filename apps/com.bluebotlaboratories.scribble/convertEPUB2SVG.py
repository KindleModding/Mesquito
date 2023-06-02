import os

for folder in os.listdir('./templates/'):
    with open(os.path.join('./templates/', folder, 'OEBPS/part0000.xhtml'), 'r', encoding='utf8') as file:
        with open('./' + folder + '.svg', 'w', encoding='utf8') as svgFile:
            svgFile.write(list(file)[7].replace('</body>', ''))