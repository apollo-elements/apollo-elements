---
layout: api
package: '@apollo-elements/interfaces'
module: './apollo-element.ts'
socialMediaImage: https://res.cloudinary.com/apolloelements/image/upload/w_1200,h_630,c_fill,q_auto,f_auto/w_600,c_fit,co_rgb:eee,g_south_west,x_60,y_200,l_text:open sans_128_bold:Elements/w_1200,h_630,c_fill,q_auto,f_auto/w_600,c_fit,co_rgb:eee,g_south_west,x_60,y_100,l_text:open sans_78:Apollo Elements/social-template.svg
---
# Interfaces >> ApolloElement || 00

Common base interface for Apollo Elements. Elements take either one or two type parameters. A single parameter is either a `TypedDocumentNode` or the type of the operation's result, in which case the variables type defautls to `OperationVariables`, which is an object of arbitrary string keys and unknown values. If two parameters are used, the first is the result type, the second is the type of the operation variables.
