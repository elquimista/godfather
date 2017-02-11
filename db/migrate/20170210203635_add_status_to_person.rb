class AddStatusToPerson < ActiveRecord::Migration[5.0]
  def change
    add_column :people, :status, :integer
    add_index :people, :status
  end
end
