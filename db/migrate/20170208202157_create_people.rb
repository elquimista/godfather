class CreatePeople < ActiveRecord::Migration[5.0]
  def change
    create_table :people do |t|
      t.string :full_name, null: false
      t.string :photo_url

      t.timestamps
    end
  end
end
