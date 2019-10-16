var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var ContactModel = require('../models').Contact;
var SuggestModel = require('../models').Suggest;
var IdeasModel = require('../models').Ideas;

var contactType = new GraphQLObjectType ({
  name: "contact",
  fields: function() {
    return {
      id: {
        type: GraphQLInt
      },
      name: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      message: {
        type: GraphQLString
      },
      state: {
        type: GraphQLString
      },
      createdAt: {
        type: GraphQLDate
      },
    };
  }
})
var suggestType = new GraphQLObjectType ({
  name: "suggest",
  fields: function() {
    return {
      id: {
        type: GraphQLInt
      },
      name: {
        type: GraphQLString
      },
      username: {
        type: GraphQLString
      },
      createdAt: {
        type: GraphQLDate
      },
    };
  }
})
var ideasType = new GraphQLObjectType ({
  name: "ideas",
  fields: function() {
    return {
      id: {
        type: GraphQLInt
      },
      name: {
        type: GraphQLString
      },
      username: {
        type: GraphQLString
      },
      createdAt: {
        type: GraphQLDate
      },
    };
  }
})

var queryType = new GraphQLObjectType ({
  name: 'Query',
  fields: function() {
    return {
      contacts: {
        type: new GraphQLList(contactType),
        resolve: function () {
          const contacts = ContactModel.findAll({
            order: [
              ['createdAt', 'DESC']
            ]
          })
          if (!contacts) {
            throw new Error('Error')
          }
          return contacts
        }
      },
      contact: {
        type: contactType,
        args: {
          id: {
            name: 'id',
            type: GraphQLString
          }
        },
        resolve: function(root, params) {
          const contactDetails = ContactModel.findByPk(params.id).exec()
          if (!contactDetails) {
            throw new Error('Error')
          }
          return contactDetails
        }
      },
      suggests: {
        type: new GraphQLList(suggestType),
        resolve: function () {
          const suggests = SuggestModel.findAll({
            order: [
              ['createdAt', 'DESC']
            ]
          })
          if (!suggests) {
            throw new Error('Error')
          }
          return suggests
        }
      },
      suggest: {
        type: suggestType,
        args: {
          id: {
            name: 'id',
            type: GraphQLString
          }
        },
        resolve: function(root, params) {
          const suggestsDetails = SuggestModel.findByPk(params.id).exec()
          if (!suggestsDetails) {
            throw new Error('Error')
          }
          return suggestsDetails
        }
      },
      ideas: {
        type: new GraphQLList(ideasType),
        resolve: function () {
          const ideas = IdeasModel.findAll({
            order: [
              ['createdAt', 'DESC']
            ]
          })
          if (!ideas) {
            throw new Error('Error')
          }
          return ideas
        }
      },
      idea: {
        type: ideasType,
        args: {
          id: {
            name: 'id',
            type: GraphQLString
          }
        },
        resolve: function(root, params) {
          const ideasDetails = IdeasModel.findByPk(params.id).exec()
          if (!ideasDetails) {
            throw new Error('Error')
          }
          return ideasDetails
        }
      },
    }
  }
})

module.exports = new GraphQLSchema({ query: queryType });

var mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: function () {
    return {
      addContact: {
        type: contactType,
        args: {
          name: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          },
          message: {
            type: new GraphQLNonNull(GraphQLString)
          },
          state: {
            type: new GraphQLNonNull(GraphQLString)
          },
        },
        resolve: function (root, params) {
          const contactModel = new ContactModel(params);
          const newContact = contactModel.save();
          if (!newContact) {
            throw new Error('Error');
          }
          return newContact
        }
      },
      addSuggest: {
        type: suggestType,
        args: {
          name: {
            type: new GraphQLNonNull(GraphQLString)
          },
          username: {
            type: new GraphQLNonNull(GraphQLString)
          },
        },
        resolve: function (root, params) {
          const suggestModel = new SuggestModel(params);
          const newSuggest = suggestModel.save();
          if (!newSuggest) {
            throw new Error('Error');
          }
          return newSuggest
        }
      },
      addIdeas: {
        type: ideasType,
        args: {
          name: {
            type: new GraphQLNonNull(GraphQLString)
          },
          username: {
            type: new GraphQLNonNull(GraphQLString)
          },
        },
        resolve: function (root, params) {
          const ideasModel = new IdeasModel(params);
          const newIdeas = ideasModel.save();
          if (!newIdeas) {
            throw new Error('Error');
          }
          return newIdeas
        }
      },
      updateContact: {
        type: contactType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLInt)
          },
          name: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          },
          message: {
            type: new GraphQLNonNull(GraphQLString)
          },
          state: {
            type: new GraphQLNonNull(GraphQLString)
          },
        },
        resolve(root, params) {
          return ContactModel
          .findByPk(params.id)
          .then(contact => {
            if (!contact) {
              throw new Error('Not found')
            }
            return contact 
            .update({
              name: params.name || contact.name,
              email: params.email || contact.email,
              message: params.message || contact.message,
              state: params.state || contact.state,
            })
            .catch((error) => { throw new Error(error)})
          })
        },
      },
      updateSuggest: {
        type: suggestType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLInt)
          },
          name: {
            type: new GraphQLNonNull(GraphQLString)
          },
          username: {
            type: new GraphQLNonNull(GraphQLString)
          },
        },
        resolve(root, params) {
          return SuggestModel
          .findByPk(params.id)
          .then(suggest => {
            if (!suggest) {
              throw new Error('Not found')
            }
            return suggest 
            .update({
              name: params.name || suggest.name,
              username: params.username || suggest.username,
            })
            .catch((error) => { throw new Error(error)})
          })
        },
      },
      updateIdeas: {
        type: ideasType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLInt)
          },
          name: {
            type: new GraphQLNonNull(GraphQLString)
          },
          username: {
            type: new GraphQLNonNull(GraphQLString)
          },
        },
        resolve(root, params) {
          return IdeasModel
          .findByPk(params.id)
          .then(ideas => {
            if (!ideas) {
              throw new Error('Not found')
            }
            return ideas 
            .update({
              name: params.name || ideas.name,
              username: params.username || ideas.username,
            })
            .catch((error) => { throw new Error(error)})
          })
        },
      },
      removeContact: {
        type: contactType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve(root, params) {
          return ContactModel
          .findByPk(params.id)
          .then(contact => {
            if (!contact) {
              throw new Error('Not found')
            }
            return contact
            .destroy()
            .then(() => { return contact;})
            .catch((error) => { throw new Error(error)})
          })
          .catch((error) => { throw new Error(error)})
        }
      },
      removeSuggest: {
        type: suggestType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve(root, params) {
          return SuggestModel
          .findByPk(params.id)
          .then(suggest => {
            if (!suggest) {
              throw new Error('Not found')
            }
            return suggest
            .destroy()
            .then(() => { return suggest;})
            .catch((error) => { throw new Error(error)})
          })
          .catch((error) => { throw new Error(error)})
        }
      },
      removeIdeas: {
        type: ideasType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve(root, params) {
          return IdeasModel
          .findByPk(params.id)
          .then(ideas => {
            if (!ideas) {
              throw new Error('Not found')
            }
            return ideas
            .destroy()
            .then(() => { return ideas;})
            .catch((error) => { throw new Error(error)})
          })
          .catch((error) => { throw new Error(error)})
        }
      },
    }
  }
})

module.exports = new GraphQLSchema({query: queryType, mutation: mutation});