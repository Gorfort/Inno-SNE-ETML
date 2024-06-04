const ProductModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "mcdo du croi il vendent deux produit qui se nomme big teasty? t un peux toyu toi",
        },
        validate: {
          is: {
            args: /^[A-Za-z\s]*$/,
            msg: "a tu déja vu un article se nommé _:;.-323(/, non? c'est normal sa existe pas",
          },
          notEmpty: {
            msg: `ta déja vu quelque chose se vendre sans nom? "ouais alors moi j'ai acheter . au magazin", c'est un peux debile on est d'accord?`,
          },
          notNull: {
            msg: "quand on te dit met un nom, tu met un truc. tu vas pas acheter . au magazin",
          },
        },
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: {
            msg: "Utilisez uniquement des nombres pour le prix, un priiiixxx. tu paye pas ta ps5 en cochon dinde",
          },
          notEmpty: {
            msg: "on ta dit met un prix et tu met rien? tu t'est cru au troc bouffon?",
          },
          notNull: {
            msg: "Le prix est une propriété obligatoire.",
          },
          min: {
            args: [1.0],
            msg: "quand tu achete un truc tu crois c gratuit?",
          },
          max: {
            args: [1000.0],
            msg: "on vend de la bouff pas des pc, 1000 balle le steck tu veu arnaquer qui avec sa",
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
export { ProductModel };
