const { article } = require("../utils/utils");

module.exports = {
  saveTokenAndLogStatus: function (requestParams, response, context, ee, next) {
    if (response.statusCode === 200 && response.body) {
      const token = response.body.replace(/['"]+/g, "");
      context.vars.token = token;
      console.log(`Token saved: ${token}`);
    } else {
      console.log(
        `Failed to retrieve token, status code: ${response.statusCode}, response body: ${response.body}`
      );
    }

    return next();
  },

  getAllArticles: function (requestParams, response, context, ee, next) {
    if (response.statusCode === 200 && response.body) {
      const articles = JSON.parse(response.body);
      context.vars.articles = articles;
      console.log(`All articles: ${JSON.stringify(articles)}`);
    } else {
      console.log(
        `Failed to get all articles, status code: ${response.statusCode}, response body: ${response.body}`
      );
    }
    return next();
  },

  loadArticleData: function (requestParams, response, context, ee, next) {
    const serializeArticle = JSON.stringify(article);
    context.vars.articleData = serializeArticle;
    return next();
  },

  getAllCreatedArticles: function (requestParams, response, context, ee, next) {
    if (response.statusCode === 200 && response.body) {
      const articles = JSON.parse(response.body);
      const createdArticles = articles.filter(article => article.author === "John Doe");
      context.vars.createdArticles = createdArticles;
      console.log(`Created articles: ${JSON.stringify(createdArticles)}`);
    } else {
      console.log(`Failed to get created articles, status code: ${response.statusCode}, response body: ${response.body}`);
    }
    return next();
  },

  logArticleCreation: function (requestParams, response, context, ee, next) {
    console.log(`Using token for article creation: ${context.vars.token}`);
    if (response.statusCode === 201 && response.body) {
      const newArticle = JSON.parse(response.body);
      console.log(newArticle, "newArticle")
      context.vars.createdArticleId = newArticle._id;
      console.log(`New article created with ID: ${newArticle._id}`);
    } else {
      console.log(`Failed to create article, status code: ${response.statusCode}, response body: ${response.body}`);
    }
    return next();
  },

  deleteCreatedArticles: function (requestParams, response, context, ee, next) {
    const articles = context.vars.createdArticles;
    if (articles && articles.length > 0) {
      articles.forEach(article => {
        const deleteParams = {
          url: `/api/articles/${article._id}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${context.vars.token}`
          }
        };
        ee.emit('request', deleteParams);
      });
    }
    return next();
  },

  logArticleUpdate: function (requestParams, response, context, ee, next) {
    if (response.statusCode === 200) {
      console.log(`Article updated with status: ${response.statusCode}`);
    } else {
      console.log(
        `Failed to update article, status code: ${response.statusCode}, response body: ${response.body}`
      );
    }
    return next();
  },

  logArticleDeletion: function (requestParams, response, context, ee, next) {
    if (response.statusCode === 200) {
      console.log(`Article deleted with status: ${response.statusCode}`);
    } else {
      console.log(
        `Failed to delete article, status code: ${response.statusCode}, response body: ${response.body}`
      );
    }
    return next();
  },

  logCommandeCreation: function (requestParams, response, context, ee, next) {
    if (response.statusCode === 201 && response.body) {
      const newCommande = JSON.parse(response.body);
      context.vars.createdCommandeId = newCommande.id;
      console.log(`New commande created with ID: ${newCommande.id}`);
    } else {
      console.log(
        `Failed to create commande, status code: ${response.statusCode}, response body: ${response.body}`
      );
    }
    return next();
  },

  getAllCommandes: function (requestParams, response, context, ee, next) {
    if (response.statusCode === 200 && response.body) {
      const commandes = JSON.parse(response.body);
      context.vars.commandes = commandes;
      console.log(`All commandes: ${JSON.stringify(commandes)}`);
    } else {
      console.log(
        `Failed to get all commandes, status code: ${response.statusCode}, response body: ${response.body}`
      );
    }
    return next();
  },

  logUserSignup: function (requestParams, response, context, ee, next) {
    if (response.statusCode === 201 && response.body) {
      const newUser = JSON.parse(response.body);
      context.vars.userId = newUser.id;
      console.log(`New user signed up with ID: ${newUser.id}`);
    } else {
      console.log(
        `Failed to sign up user, status code: ${response.statusCode}, response body: ${response.body}`
      );
    }
    return next();
  },

  logUserUpdate: function (requestParams, response, context, ee, next) {
    if (response.statusCode === 200) {
      console.log(`User updated with status: ${response.statusCode}`);
    } else {
      console.log(
        `Failed to update user, status code: ${response.statusCode}, response body: ${response.body}`
      );
    }
    return next();
  },

  logUserDeletion: function (requestParams, response, context, ee, next) {
    if (response.statusCode === 200) {
      console.log(`User deleted with status: ${response.statusCode}`);
    } else {
      console.log(
        `Failed to delete user, status code: ${response.statusCode}, response body: ${response.body}`
      );
    }
    return next();
  },
};
