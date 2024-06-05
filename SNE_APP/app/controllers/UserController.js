const controller = {
  get: (req, res) => {
    connection.query("SELECT * FROM t_user", (error, result) => {
      if (error) {
        const message =
          "Impossible de récupérer les informations merci de réssayer plus tard";
        res.status(500).json({ message });
      }
      if (result === null) {
        const message = "Impossible de trouver les users";
        res.status(404).json({ message });
      } else {
        res.json(result);
        console.log(result);
      }
    });
  },
};

export default controller;
