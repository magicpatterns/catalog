import { FernApi } from '../api'
import { ImdbService } from '../api/generated/api/resources/imdb/service/ImdbService'

export default new ImdbService({
  createMovie: (req, res) => {
    const id = req.body.title.toLowerCase().replaceAll(' ', '-')

    // TODO, add movie to database

    return res.send(id)
  },
  getMovie: (req, res) => {
    if (req.params.movieId === 'goodwill-hunting') {
      res.send({
        id: req.params.movieId,
        title: 'Goodwill Hunting',
        rating: 4.9,
      })
    } else {
      throw new FernApi.MovieDoesNotExistError()
    }
  },
})
