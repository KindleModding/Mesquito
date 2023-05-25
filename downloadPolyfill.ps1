# Using polyfills for
#
# - default
# - es6
# - Promise
# - Promise.allSettled
# - Promise.any
# - Promise.prototype.finally
# - RegExp.prototype.@@matchAll
# - String.prototype.matchAll
# - Element
# - Element.prototype.after
# - Element.prototype.animate
# - Element.prototype.append
# - Element.prototype.before
# - Element.prototype.classList
# - Element.prototype.cloneNode
# - Element.prototype.closest
# - Element.prototype.dataset
# - Element.prototype.getAttributeNames
# - Element.prototype.inert
# - Element.prototype.matches
# - Element.prototype.nextElementSibling
# - HTMLTemplateElement
# - HTMLSelectElement.prototype.selectedOptions
# - HTMLPictureElement
# - HTMLInputElement.prototype.valueAsDate
# - HTMLCanvasElement.protoype.toBlob
# - HTMLCanvasElement.prototype.toBlob
# - Element.prototype.toggleAttribute
# - Element.prototype.scrollIntoView
# - Element.prototype.scrollBy
# - Element.prototype.scroll
# - Element.prototype.replaceWith
# - Element.prototype.remove
# - Element.prototype.previousElementSibling
# - Element.prototype.prepend
# - Element.prototype.placeholder
# - window.scroll
# - smoothscroll
# - scrollY
# - scrollX
# - scrollIntoView
# - scrollBy
# - scroll
# - viewport
# - setImmediate
# - window.scrollBy

Invoke-WebRequest `
-URI 'https://polyfill.io/v3/polyfill.min.js?features=es6%2CPromise%2CPromise.allSettled%2CPromise.any%2CPromise.prototype.finally%2CRegExp.prototype.%40%40matchAll%2CString.prototype.matchAll%2Cdefault%2CElement%2CElement.prototype.after%2CElement.prototype.animate%2CElement.prototype.append%2CElement.prototype.before%2CElement.prototype.classList%2CElement.prototype.cloneNode%2CElement.prototype.closest%2CElement.prototype.dataset%2CElement.prototype.getAttributeNames%2CElement.prototype.inert%2CElement.prototype.matches%2CElement.prototype.nextElementSibling%2CHTMLTemplateElement%2CHTMLSelectElement.prototype.selectedOptions%2CHTMLPictureElement%2CHTMLInputElement.prototype.valueAsDate%2CHTMLCanvasElement.protoype.toBlob%2CHTMLCanvasElement.prototype.toBlob%2CElement.prototype.toggleAttribute%2CElement.prototype.scrollIntoView%2CElement.prototype.scrollBy%2CElement.prototype.scroll%2CElement.prototype.replaceWith%2CElement.prototype.remove%2CElement.prototype.previousElementSibling%2CElement.prototype.prepend%2CElement.prototype.placeholder%2Cwindow.scroll%2Csmoothscroll%2CscrollY%2CscrollX%2CscrollIntoView%2CscrollBy%2Cscroll%2Cviewport%2CsetImmediate%2Cwindow.scrollBy' `
-UserAgent 'Mozilla/5.0 (X11; U; Linux armv7l like Android; en-us) AppleWebKit/531.2+ (KHTML, like Gecko) Version/5.0 Safari/533.2+ Kindle/3.0+' `
-O polyfill.min.js

pause