class CreateFamilyTrees < ActiveRecord::Migration[5.0]
  def change
    create_table :family_trees do |t|
      t.text :raw_data

      t.timestamps
    end
  end
end
