const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: 'Le nom est déjà pris.'
        },
        validate: {
            notEmpty: { msg: 'Le nom du pokémon ne doit pas être vide.' },
            notNull: { msg: 'Le nom du pokémon est requis.' }
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: 'Utiliser uniquement des entiers pour les points de vie.'},
            notNull: { msg: 'Les points de vie sont une propriété requise.' },
            min: {
                args: [0],
                msg: 'Les points de vie doivent être supérieurs ou égals à 0.'
            },
            max: {
                args: [999],
                msg: 'Les points de vie doivent être inférieurs ou égals à 999'
            }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: 'Utiliser uniquement des entiers pour les points de force.' },
            notNull: { msg: 'Les points de force sont une propriété requise.' },
            min: {
                args: [0],
                msg: 'Les points de force doivent être supérieurs ou égals à 0.'
            },
            max: {
                args: [999],
                msg: 'Les points de force doivent être inférieurs ou égals à 99'
            }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: { msg: 'Le lien de la photo doit être une url valide.' },
            notNull: { msg: 'Le lien de la photo est requis.' }
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('types').toString().split(',')
        },
        set(vtypes) {
            return this.setDataValue('types', vtypes.toString())
        },
        validate: {
            isTypesValid(value) {
                if(!value) {
                    throw new Error('Un pokémon doit avoir au moins un type.')
                }
                if(value.toString().split(',').length > 3) {
                    throw new Error('Un pokémon ne peut pas avoir plus de trois types.')
                }
                value.split(',').forEach(type => {
                    if(!validTypes.includes(type)) {
                        throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante : ${validTypes}`)
                    }
                })
            }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }