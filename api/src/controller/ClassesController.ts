import { Response, Request } from 'express';
import knex from '../database/connection';

class ClassesController {
  async index(request: Request, response: Response): Promise<Response> {
    const { city, uf, activities } = request.query;

    const parsedActivities = String(activities)
      .split(',')
      .map(activity => Number(activity.trim()));

    const classes = await knex('classes')
      .join('class_activities', 'classes.id', '=', 'class_activities.class_id')
      .whereIn('class_activities.activity_id', parsedActivities)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('classes.*');

    const serializedClasses = classes.map(clazz => {
      return {
        ...clazz,
        image_url: `http://192.168.100.5:3333/uploads/${clazz.image}`,
      };
    });

    return response.json(serializedClasses);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const uniqueClass = await knex('classes').where('id', id).first();

    if (!uniqueClass) {
      return response.status(400).json({ message: 'Class not found.' });
    }

    const serializedClass = {
      ...uniqueClass,
      image_url: `http://192.168.100.5:3333/uploads/${uniqueClass.image}`,
    };

    const activities = await knex('activities')
      .join(
        'class_activities',
        'activities.id',
        '=',
        'class_activities.activity_id',
      )
      .where('class_activities.class_id', id)
      .select('activities.title');

    return response.json({ class: serializedClass, activities });
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      address,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      activities,
    } = request.body;

    const trx = await knex.transaction();

    const uniqueClass = {
      image: request.file.filename,
      name,
      description,
      address,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const insertedIds = await trx('classes').insert(uniqueClass);

    const class_id = insertedIds[0];

    const classActivities = activities
      .split(',')
      .map((activity: string) => Number(activity.trim()))
      .map((activity_id: number) => {
        return {
          activity_id,
          class_id,
        };
      });

    await trx('class_activities').insert(classActivities);

    await trx.commit();

    return response.json({ id: class_id, ...uniqueClass });
  }
}

export default ClassesController;
